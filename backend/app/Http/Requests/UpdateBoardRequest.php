<?php

namespace App\Http\Requests;

use App\Rules\BoardExistsRule;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

class UpdateBoardRequest extends FormRequest
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
            'id' => ['uuid', new BoardExistsRule()],
            'name' => 'required|string|max:100',
            'description' => 'required|string|max:500'
        ];
    }

    public function messages(): array
    {
        return [
            'id.uuid' => 'Идентификатор доски должен иметь тип данных UUID',
            'name.required' => 'Поле Название обязательно для заполнения',
            'name.string' => 'Поле Название должно содержать строковой тип данных',
            'name.max' => 'Поле Название должно иметь максимальную длину в 100 символов',
            'description.required' => 'Поле Описание обязательно для заполнения',
            'description.string' => 'Поле Описание должно содержать строковой тип данных',
            'description.max' => 'Поле Описание должно иметь максимальную длину в 500 символов'
        ];
    }

    protected function failedValidation(Validator $validator)
    {
        throw new HttpResponseException(response()->json([
            'message' => 'Ошибка при обновлении доски',
            'errors' => $validator->errors()->getMessages(),
        ], 422));
    }
}
