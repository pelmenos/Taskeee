<?php

namespace App\Http\Requests;

use App\Rules\UserEmailExistsRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class PasswordResetRequest extends FormRequest
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
            'email' => ['required','email', new UserEmailExistsRule()],
            'password' => [
                'required',
                'min:8',
                'regex:/[a-z]/',
                'regex:/[A-Z]/',
                'regex:/[0-9]/',
                'regex:/[!@#$%^&*?:;]/'
            ],
            'verify_code' => 'required|integer|min_digits:6'
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'Электронная почта должна быть передана для запроса',
            'email.email' => 'Электронная почта должна соответствовать формату эл. почт',
            'password.required' => 'Поле Пароль обязательно для заполнения',
            'password.min' => 'Поле Пароль должно быть длинной минимум в 8 символов',
            'password.regex' => 'Поле Пароль должно содержать латинские прописные и строчные буквы, цифры и специальные символы',
            'verify_code.required' => 'Используемый код должен быть передан для запроса',
            'verify_code.integer' => 'Используемый код должен быть числом',
            'verify_code.min_digits' => 'Используемый код должен быть длинной в 6 символов'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Ошибка при сбросе пароля',
            'errors' => $validator->errors()->getMessages(),
        ], 422));
    }
}
