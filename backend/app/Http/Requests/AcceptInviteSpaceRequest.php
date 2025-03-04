<?php

namespace App\Http\Requests;

use App\Rules\InviteEmailRule;
use Illuminate\Foundation\Http\FormRequest;

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
            'token' => $this->route('token'),
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
            'token' => 'exists:invite_tokens,token', // и проверка что юзер не переходит по ссылке сам, типо сам отправил приглос и сам переходит, для этого надо добавить поле user_id в invite_tokens
        ];
    }

    public function messages(): array
    {
        return [
            'token.exists' => 'Токен приглашения должен существовать',
        ];
    }
}
