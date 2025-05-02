<?php

namespace App\Http\Requests;

use App\Rules\SpaceExistsRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class SearchProjectsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'query' => 'nullable|string|max:100',
            'space_id' => ['required', 'uuid', new SpaceExistsRule()]
        ];
    }

    public function messages(): array
    {
        return [
            'query.string' => 'Поле поиска должно содержать строковой тип данных',
            'query.max' => 'Поле поиска должно иметь максимальную длину в 100 символов',
            'space_id.required' => 'Идентификатор пространства должен быть передан для запроса',
            'space_id.uuid' => 'Идентификатор пространства должен иметь тип данных UUID'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Ошибка при поиске проектов',
            'errors' => $validator->errors()->getMessages(),
        ], 422));
    }
}
