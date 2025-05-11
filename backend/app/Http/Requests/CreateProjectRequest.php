<?php

namespace App\Http\Requests;

use App\Rules\CreateProjectMembersUniqueRule;
use App\Rules\SpaceExistsRule;
use App\Rules\SpaceUserExistsRule;
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
            'space_id' => ['required', 'uuid', new SpaceExistsRule()],
            'members' => ['nullable', 'array', 'min:1', new CreateProjectMembersUniqueRule()],
            'members.*' => ['uuid', new SpaceUserExistsRule()],
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
            'members.array' => 'Поле Участники должно быть массивом',
            'members.min' => 'Поле Участники должно содержать хотя бы одного участника',
            'members.*.uuid' => 'Идентификаторы всех участников должны иметь тип данных UUID',
            'boards.required' => 'Доски обязательны для передачи в запросе',
            'boards.array' => 'Доски должны быть массивом',
            'boards.max' => 'Доски должны содержать одну доску по умолчанию',
            'boards.*.array' => 'Доска по умолчанию должна быть JSON-объектом',
            'boards.*.name.required' => 'Доска по умолчанию должна иметь название',
            'boards.*.name.string' => 'Доска по умолчанию должна иметь название строкового типа данных',
            'boards.*.name.max' => 'Доска по умолчанию должна иметь название не более 100 символов',
            'boards.*.description.required' => 'Доска по умолчанию должна иметь описание',
            'boards.*.description.string' => 'Доска по умолчанию должна иметь описание строкового типа данных',
            'boards.*.description.max' => 'Доска по умолчанию должна иметь описание не более 500 символов'
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
