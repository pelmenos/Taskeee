<?php

namespace App\Http\Requests;

use App\Rules\InviteEmailRule;
use App\Rules\SpaceExistsRule;
use App\Rules\SpaceRoleNameExistsRule;
use App\Rules\UserEmailExistsRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

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
            'id' => ['uuid', new SpaceExistsRule()],
            'email' => ['required', 'email', new UserEmailExistsRule(), new InviteEmailRule()],
            'role' => ['required','string', new SpaceRoleNameExistsRule()]
        ];
    }

    public function messages(): array
    {
        return [
            'id.uuid' => 'Идентификатор пространства должен иметь тип данных UUID',
            'email.required' => 'Поле Электронная почта обязательно для заполнения',
            'email.email' => 'Поле Электронная почта должно содержать валидный адрес эл. почты',
            'role.required' => 'Поле Роль пространства обязательно для заполнения',
            'role.string' => 'Поле Роль пространства должно содержать строковой тип данных'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Ошибка при отправлении приглашения',
            'errors' => $validator->errors()->getMessages(),
        ], 422));
    }
}
