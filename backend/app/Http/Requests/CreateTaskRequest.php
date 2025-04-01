<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class CreateTaskRequest extends FormRequest
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
            'status' => 'required|in:Выполнена,В процессе',
            'board_id' => 'required|exists:boards,id'
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
            'status.required' => 'Поле Статус обязательно для заполнения',
            'status.in' => 'Поле Статус должно содержать одно из значений: Выполнена, В процессе',
            'board_id.required' => 'Идентификатор доски должен быть передан для запроса',
            'board_id.exists' => 'Идентификатор доски не относится ни к одной из досок'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Ошибка при создании задачи',
            'errors' => $validator->errors()->getMessages(),
        ], 422));
    }
}
