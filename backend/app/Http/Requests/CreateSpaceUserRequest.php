<?php

namespace App\Http\Requests;

use App\Rules\CreateSpaceUserEmailRule;
use App\Rules\SpaceExistsRule;
use App\Rules\SpaceRoleExistsRule;
use App\Rules\UserEmailExistsRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class CreateSpaceUserRequest extends FormRequest
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
            'space_id' => ['required', 'uuid', new SpaceExistsRule()],
            'email' => ['required', 'email', new UserEmailExistsRule(), new CreateSpaceUserEmailRule()],
            'role_id' => ['required', 'uuid', new SpaceRoleExistsRule()]
        ];
    }

    public function messages(): array
    {
        return [
            'space_id.required' => 'Идентификатор пространства должен быть передан для запроса',
            'space_id.uuid' => 'Идентификатор пространства должен иметь тип данных UUID',
            'email.required' => 'Поле Электронная почта обязательно для заполнения',
            'email.email' => 'Поле Электронная почта должно содержать валидный адрес эл. почты',
            'role_id.required' => 'Поле Роль пространства обязательно для заполнения',
            'role_id.uuid' => 'Поле Роль пространства должно иметь тип данных UUID'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Ошибка при создании пользователя пространства',
            'errors' => $validator->errors()->getMessages(),
        ], 422));
    }
}
