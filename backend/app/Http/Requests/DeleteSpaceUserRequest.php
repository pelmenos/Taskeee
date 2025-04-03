<?php

namespace App\Http\Requests;

use App\Rules\SpaceUserExistsRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class DeleteSpaceUserRequest extends FormRequest
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
            'space_user_id' => $this->route('id')
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
            'space_user_id' => ['uuid', new SpaceUserExistsRule()]
        ];
    }

    public function messages(): array
    {
        return [
            'space_user_id.uuid' => 'Идентификатор пользователя пространства должен иметь тип данных UUID'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Ошибка при удалении пользователя пространства',
            'errors' => $validator->errors()->getMessages(),
        ], 422));
    }
}
