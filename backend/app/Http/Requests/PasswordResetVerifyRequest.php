<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class PasswordResetVerifyRequest extends FormRequest
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
            'email' => 'required|email|exists:users,email',
            'verify_code' => 'required|integer|min_digits:6'
        ];
    }

    public function messages(): array
    {
        return [
            'email.required' => 'Электронная почта должна быть передана для запроса',
            'email.email' => 'Электронная почта должна соответствовать формату эл. почт',
            'email.exists' => 'Использованная эл. почта не относится ни к одному из пользователей',
            'verify_code.required' => 'Поле с кодом обязательно для заполнения',
            'verify_code.integer' => 'Поле с кодом должно содержать число',
            'verify_code.min_digits' => 'Поле с кодом должно содержать код длинной в 6 символов'
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
