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
            'id' => $this->route('id'),
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
            'id' => 'exists:spaces',
            'email' => ['required', 'email','exists:users,email', new InviteEmailRule()], // тут также дописать проверку что юзер есть в табличке из 1.4, либо же в контроллере это чекать
            'role' => 'required|string', // Как будет табличка из 1.4 то проверять нужно что роль существует(скорее всего именно как в спейсе)
        ];
    }

    public function messages(): array
    {
        return [
            'id.exists' => 'Идентификатор пространства должен относится к существующему пространству',
            'email.required' => 'Поле Электронная почта обязательно для заполнения',
            'email.email' => 'Поле Электронная почта должно содержать валидный адрес эл. почты',
            'email.exists' => 'Поле Электронная почта должна принадлежать существующему аккаунту',
            'role.required' => 'Поле Роль обязательно для заполнения',
            'role.string' => 'Поле Роль должно содержать строковой тип данных',
        ];
    }
}
