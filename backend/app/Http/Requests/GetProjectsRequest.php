<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class GetProjectsRequest extends FormRequest
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
            'space_id' => 'required|uuid|exists:spaces,id'
        ];
    }

    public function messages(): array
    {
        return [
            'space_id.required' => 'Идентификатор пространства должен быть передан для запроса',
            'space_id.uuid' => 'Идентификатор пространства должен иметь тип данных UUID',
            'space_id.exists' => 'Идентификатор пространства не относится ни к одному пространству'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Ошибка при получении проектов',
            'errors' => $validator->errors()->getMessages(),
        ], 422));
    }
}
