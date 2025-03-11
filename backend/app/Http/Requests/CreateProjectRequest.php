<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
            'description' => 'string|max:500',
            'space_id' => 'required|uuid|exists:spaces,id',
            'members' => 'required|array|min:1',
            'members.*' => 'uuid|exists:space_users,id',
            'boards' => 'required|array|min:1|max:20',
            'boards.*' => 'string'
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
            'members.required' => 'Поле участники обязательно для заполнения',
            'members.array' => 'Поле участники должно быть массивом',
            'members.min' => 'Поле участники должно содержать хотя бы одного участника',
            'members.*.uuid' => 'Идентификаторы всех участников должны иметь тип данных UUID',
            'members.*.exists' => 'Идентификаторы всех участников должны относится к существующим пользователям пространств',
            'boards.required' => 'Поле доски обязательно для заполнения',
            'boards.array' => 'Поле доски должно быть массивом',
            'boards.min' => 'Поле доски должно содержать хотя бы одну доску',
            'boards.max' => 'Поле доски должно содержать максимум 20 досок',
            'boards.*.string' => 'Доски должны иметь тип данных string'
        ];
    }
}
