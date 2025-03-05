<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
            'email' => $this->route('email'),
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
            'id' => 'uuid|exists:spaces',
            'email' => 'email|exists:space_users,email',
        ];
    }

    public function messages(): array
    {
        return [
            'id.uuid' => 'Идентификатор роли пространства должен иметь тип данных UUID',
            'id.exists' => 'Идентификатор роли пространства должен относится к существующей роли пространства',
            'email.email' => 'Электронная почта должна содержать валидный адрес эл. почты',
            'email.exists' => 'Электронная почта должна относится к существующему пользователю пространства'
        ];
    }
}
