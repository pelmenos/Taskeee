<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class DeleteSpaceUserRequest extends FormRequest
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
            'id' => $this->route('id'),
            'email' => $this->route('email')
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
            'id' => 'uuid|exists:spaces,id',
            'email' => 'email|exists:space_users,email'
        ];
    }

    public function messages(): array
    {
        return [
            'id.uuid' => 'Идентификатор пространства должен иметь тип данных UUID',
            'id.exists' => 'Идентификатор пространства должен относится к существующему пространству',
            'email.email' => 'Электронная почта должна содержать валидный адрес эл. почты',
            'email.exists' => 'Электронная почта должна относится к существующему пользователю пространства'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Ошибка при удалении пользователя пространства',
            'errors' => $validator->errors()->getMessages(),
        ], 422));
    }
}
