<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
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
            'id' => 'uuid|exists:tasks,id',
            'name' => 'required|string|max:100',
            'description' => 'required|string|max:500',
            'status' => 'required|in:Выполнена,В процессе'
        ];
    }

    public function messages(): array
    {
        return [
            'id.uuid' => 'Идентификатор задачи должен иметь тип данных UUID',
            'id.exists' => 'Идентификатор задачи не относится ни к одной из задач',
            'name.required' => 'Поле Название обязательно для заполнения',
            'name.string' => 'Поле Название должно содержать строковой тип данных',
            'name.max' => 'Поле Название должно иметь максимальную длину в 100 символов',
            'description.required' => 'Поле Описание обязательно для заполнения',
            'description.string' => 'Поле Описание должно содержать строковой тип данных',
            'description.max' => 'Поле Описание должно иметь максимальную длину в 500 символов',
            'status.required' => 'Поле Статус обязательно для заполнения',
            'status.in' => 'Поле Статус должно содержать одно из значений: Выполнена, В процессе'
        ];
    }
}
