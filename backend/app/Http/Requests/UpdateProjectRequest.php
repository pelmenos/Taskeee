<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateProjectRequest extends FormRequest
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
            'id' => 'uuid|exists:projects,id',
            'name' => 'required|string|max:100',
            'description' => 'required|string|max:500',
            'members' => 'array|min:1',
            'members.*' => 'uuid|exists:space_users,id',
            'boards' => 'array|min:1|max:20',
            'boards.*' => 'array',
            'boards.*.name' => 'required|string|max:100',
            'boards.*.description' => 'required|string|max:500'
        ];
    }

    public function messages(): array
    {
        return [
            'id.uuid' => 'Идентификатор проекта должен иметь тип данных UUID',
            'id.exists' => 'Идентификатор проекта не относится ни к одному проекту',
            'name.required' => 'Поле Название обязательно для заполнения',
            'name.string' => 'Поле Название должно содержать строковой тип данных',
            'name.max' => 'Поле Название должно иметь максимальную длину в 100 символов',
            'description.required' => 'Поле Описание обязательно для заполнения',
            'description.string' => 'Поле Описание должно содержать строковой тип данных',
            'description.max' => 'Поле Описание должно иметь максимальную длину в 500 символов',
            'members.array' => 'Поле Участники должно быть массивом',
            'members.min' => 'Поле Участники должно содержать хотя бы одного участника',
            'members.*.uuid' => 'Идентификаторы всех участников должны иметь тип данных UUID',
            'members.*.exists' => 'Идентификаторы всех участников должны относится к существующим пользователям пространств',
            'boards.array' => 'Поле Доски должно быть массивом',
            'boards.min' => 'Поле Доски должно содержать хотя бы одну доску',
            'boards.max' => 'Поле Доски должно содержать максимум 20 досок',
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
            'message' => 'Ошибка при обновлении проекта',
            'errors' => $validator->errors()->getMessages(),
        ], 422));
    }
}
