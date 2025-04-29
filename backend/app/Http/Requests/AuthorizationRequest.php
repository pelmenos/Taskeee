<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

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
            'remember_me' => 'required|string|in:true,false'
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
            'remember_me.in' => 'Поле Запомнить меня должно содержать значения: true, false'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Ошибка при авторизации',
            'errors' => $validator->errors()->getMessages(),
        ], 422));
    }
}
