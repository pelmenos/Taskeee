<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class CreateProjectRequest extends FormRequest
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
            'name' => 'required|string|max:100',
            'description' => 'nullable|string|max:500',
            'space_id' => 'required|uuid|exists:spaces,id',
            'members' => 'nullable|array|min:1',
            'members.*' => 'uuid|exists:space_users,id',
            'boards' => 'required|array|max:1',
            'boards.*' => 'array',
            'boards.*.name' => 'required|string|max:100',
            'boards.*.description' => 'required|string|max:500'
        ];
    }

    public function messages(): array
    {
        return [
            'name.required' => 'Поле Название обязательно для заполнения',
            'name.string' => 'Поле Название должно содержать строковой тип данных',
            'name.max' => 'Поле Название должно иметь максимальную длину в 100 символов',
            'description.string' => 'Поле Описание должно содержать строковой тип данных',
            'description.max' => 'Поле Описание должно иметь максимальную длину в 500 символов',
            'space_id.required' => 'Идентификатор пространства должен быть передан для запроса',
            'space_id.uuid' => 'Идентификатор пространства должен иметь тип данных UUID',
            'space_id.exists' => 'Идентификатор пространства не относится ни к одному пространству',
            'members.array' => 'Поле Участники должно быть массивом',
            'members.min' => 'Поле Участники должно содержать хотя бы одного участника',
            'members.*.uuid' => 'Идентификаторы всех участников должны иметь тип данных UUID',
            'members.*.exists' => 'Идентификаторы всех участников должны относится к существующим пользователям пространств',
            'boards.required' => 'Поле Доски обязательно для заполнения',
            'boards.array' => 'Поле Доски должно быть массивом',
            'boards.max' => 'Поле Доски должно содержать одну доску по умолчанию',
            'boards.*.array' => 'Все доски должны быть JSON-объектами',
            'boards.*.name.required' => 'Все доски должны иметь название',
            'boards.*.name.string' => 'Все доски должны иметь название строкового типа данных',
            'boards.*.name.max' => 'Все доски должны иметь название не более 100 символов',
            'boards.*.description.required' => 'Все доски должны иметь описание',
            'boards.*.description.string' => 'Все доски должны иметь описание строкового типа данных',
            'boards.*.description.max' => 'Все доски должны иметь описание не более 500 символов'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Ошибка при создании проекта',
            'errors' => $validator->errors()->getMessages(),
        ], 422));
    }
}
