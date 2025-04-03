<?php

namespace App\Http\Requests;

use App\Rules\SpaceExistsRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class DeleteSpaceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'id' => $this->route('id')
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => ['uuid', new SpaceExistsRule()]
        ];
    }

    public function messages(): array
    {
        return [
            'id.uuid' => 'Идентификатор пространства должен иметь тип данных UUID'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Ошибка при удалении пространства',
            'errors' => $validator->errors()->getMessages(),
        ], 422));
    }
}
