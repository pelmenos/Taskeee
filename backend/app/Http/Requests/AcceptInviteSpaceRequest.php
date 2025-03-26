<?php

namespace App\Http\Requests;

use App\Rules\InviteEmailRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class AcceptInviteSpaceRequest extends FormRequest
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
            'token' => $this->route('token')
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
            'token' => 'exists:invite_tokens,token'
        ];
    }

    public function messages(): array
    {
        return [
            'token.exists' => 'Токен приглашения должен существовать'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Ошибка при принятии приглашения',
            'errors' => $validator->errors()->getMessages(),
        ], 422));
    }
}
