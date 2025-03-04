<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
            'id' => $this->route('id'),
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
            'members' => 'required|array|min:1',
            'members.*' => 'uuid', // тут также проверка exists потом должна быть на юзеров спейса
            'boards' => 'required|array|min:1|max:20',
            'boards.*' => 'string'
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
            'members.required' => 'Поле участники обязательно для заполнения',
            'members.array' => 'Поле участники должно быть массивом',
            'members.min' => 'Поле участники должно содержать хотя бы одного участника',
            'members.*.uuid' => 'Идентификаторы всех участников должны иметь тип данных UUID',
            'boards.required' => 'Поле доски обязательно для заполнения',
            'boards.array' => 'Поле доски должно быть массивом',
            'boards.min' => 'Поле доски должно содержать хотя бы одну доску',
            'boards.max' => 'Поле доски должно содержать максимум 20 досок',
            'boards.*.string' => 'Доски должны иметь тип данных string'
        ];
    }
}
