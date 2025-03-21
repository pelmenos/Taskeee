<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateUserSpaceRoleRequest extends FormRequest
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
            'user_id' => $this->route('user_id')
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
            'user_id' => 'uuid|exists:space_users,id',
            'role' => 'required|string|exists:space_roles,name'
        ];
    }

    public function messages(): array
    {
        return [
            'id.uuid' => 'Идентификатор пространства должен иметь тип данных UUID',
            'id.exists' => 'Идентификатор пространства должен относится к существующему пространству',
            'user_id.uuid' => 'Идентификатор пользователя пространства должен иметь тип данных UUID',
            'user_id.exists' => 'Идентификатор пользователя пространства должен относится к существующему пользователю пространства',
            'role.required' => 'Поле Роль пространства обязательно для заполнения',
            'role.string' => 'Поле Роль пространства должно содержать строковой тип данных',
            'role.exists' => 'Поле Роль пространства должно относится к существующей роли пространства'
        ];
    }
}
