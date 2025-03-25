<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CreateSpaceUserRequest extends FormRequest
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
            'space_id' => $this->route('id'),
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
            'space_id' => 'uuid|exists:spaces,id',
            'email' => 'required|email|exists:users,email',
            'role_id' => 'required|uuid|exists:space_roles,id'
        ];
    }

    public function messages(): array
    {
        return [
            'id.uuid' => 'Идентификатор пространства должен иметь тип данных UUID',
            'id.exists' => 'Идентификатор пространства должен быть относится к существующему пространству',
            'email.required' => 'Поле Электронная почта обязательно для заполнения',
            'email.email' => 'Поле Электронная почта должно содержать валидный адрес эл. почты',
            'email.exists' => 'Поле Электронная почта должна принадлежать существующему аккаунту',
            'role_id.required' => 'Поле Роль пространства обязательно для заполнения',
            'role_id.uuid' => 'Поле Роль пространства должно иметь тип данных UUID',
            'role_id.exists' => 'Поле Роль пространства должно относится к существующей роли пространства'
        ];
    }
}
