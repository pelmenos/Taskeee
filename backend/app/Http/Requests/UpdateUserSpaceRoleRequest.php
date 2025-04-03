<?php

namespace App\Http\Requests;

use App\Rules\SpaceExistsRule;
use App\Rules\SpaceRoleNameExistsRule;
use App\Rules\SpaceUserExistsRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateUserSpaceRoleRequest extends FormRequest
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
            'user_id' => $this->route('user_id')
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
            'user_id' => ['uuid', new SpaceUserExistsRule()],
            'role' => ['required','string', new SpaceRoleNameExistsRule()]
        ];
    }

    public function messages(): array
    {
        return [
            'id.uuid' => 'Идентификатор пространства должен иметь тип данных UUID',
            'user_id.uuid' => 'Идентификатор пользователя пространства должен иметь тип данных UUID',
            'role.required' => 'Поле Роль пространства обязательно для заполнения',
            'role.string' => 'Поле Роль пространства должно содержать строковой тип данных'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Ошибка при обновлении роли пользователя пространства',
            'errors' => $validator->errors()->getMessages(),
        ], 422));
    }
}
