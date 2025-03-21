<?php

namespace App\Http\Requests;

use App\Rules\InviteEmailRule;
use Illuminate\Foundation\Http\FormRequest;

class SendInviteSpaceRequest extends FormRequest
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
            'id' => 'uuid|exists:spaces,id',
            'email' => ['required', 'email','exists:users,email', new InviteEmailRule()],
            'role' => 'required|string|exists:space_roles,name'
        ];
    }

    public function messages(): array
    {
        return [
            'id.uuid' => 'Идентификатор пространства должен иметь тип данных UUID',
            'id.exists' => 'Идентификатор пространства должен относится к существующему пространству',
            'email.required' => 'Поле Электронная почта обязательно для заполнения',
            'email.email' => 'Поле Электронная почта должно содержать валидный адрес эл. почты',
            'email.exists' => 'Поле Электронная почта должна принадлежать существующему аккаунту',
            'role.required' => 'Поле Роль обязательно для заполнения',
            'role.string' => 'Поле Роль должно содержать строковой тип данных',
            'role.exists' => 'Поле Роль должно относится к существующей роли'
        ];
    }
}
