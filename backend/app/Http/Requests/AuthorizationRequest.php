<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AuthorizationRequest extends FormRequest
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
            'email' => 'required|email',
            'password' => 'required',
            'remember_me' => 'required|string'
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'Поле Электронная почта обязательно для заполнения',
            'email.email' => 'Поле Электронная почта должно содержать валидный адрес эл. почты',
            'password.required' => 'Поле Пароль обязательно для заполнения',
            'remember_me.required' => 'Поле Запомнить меня обязательно для заполнения',
            'remember_me.string' => 'Поле Запомнить меня должно быть строкового типа',
        ];
    }
}
