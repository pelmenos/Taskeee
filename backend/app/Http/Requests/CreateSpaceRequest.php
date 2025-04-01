<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class CreateSpaceRequest extends FormRequest
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
            'avatar' => 'nullable|url',
            'admin_id' => 'required|exists:users,id',
            'tariff' => 'required|in:Free,Pro,Enterprise'
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
            'avatar.url' => 'Поле Изображение должно содержать валидную по формату ссылку',
            'admin_id.required' => 'Идентификатор пользователя должен быть передан для запроса',
            'admin_id.exists' => 'Идентификатор пользователя не относится ни к одному из пользователей',
            'tariff.required' => 'Поле Тариф обязательно для заполнения',
            'tariff.in' => 'Поле Тариф должно содержать одно из значений: Free, Pro, Enterprise'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Ошибка при создании пространства',
            'errors' => $validator->errors()->getMessages(),
        ], 422));
    }
}
