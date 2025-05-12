<?php

namespace App\Http\Requests;

use App\Models\FinanceProjectStatus;
use App\Models\SpaceUser;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class StoreFinanceProjectRequest extends FormRequest
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
        $space = SpaceUser::where(
            'email',
            User::findOrFail(auth()->id())->email
        )->firstOrFail();

        return [
            'price' => 'regex:/^-?\d+(\.\d{1,2})?$/|required',
            'comment' => 'string|max:2500',
            'status_id' => 'integer|required|in:'
                . implode(',', FinanceProjectStatus::pluck('id')->toArray()),
            'project_id' => 'uuid|required|in:'
                . implode(',', $space->projects()->pluck('project_id')->toArray()),
            'coordinator_id' => 'uuid|required|in:'
                . implode(',', $space->users()->pluck('id')->toArray()),
            'lead_id' => 'uuid|required|in:'
                . implode(',', $space->users()->pluck('id')->toArray()),
            'customer_id' => 'uuid|required|in:'
                . implode(',', $space->users()->pluck('id')->toArray()),
            'source_id' => 'uuid|required|in:'
                . implode(',', $space->users()->pluck('id')->toArray()),
        ];
    }

    public function messages()
    {
        return [
            'price.regex' => 'Цена должна быть с двумя знаками после запятой и иметь длинну не более 14 цифр',
            'price.required' => 'Цена обязательна для заполнения',
            'comment.string' => 'Комментарий должен быть строкового типа',
            'comment.max' => 'Максимальное количество символов 2500',
            'status_id.integer' => 'Статус id должен быть целочисленного типа',
            'status_id.required' => 'Укажите статус',
            'status_id.in' => 'Такого статуса не существует',
            'project_id.uuid' => 'ID проекта должен быть uuid',
            'project_id.required' => 'Проект должен быть указан',
            'project_id.in' => 'Такого проекта не существует',
            'coordinator_id.uuid' => 'ID постановщика должен быть uuid',
            'coordinator_id.required' => 'Постановщик должен быть указан',
            'coordinator_id.in' => 'Такого пользователя не существует',
            'lead_id.uuid' => 'ID ответственного за проект должен быть uuid',
            'lead_id.required' => 'Ответственный за проект должен быть указан',
            'lead_id.in' => 'Такого пользователя не существует',
            'customer_id.uuid' => 'ID закасчика за проект должен быть uuid',
            'customer_id.required' => 'Заказчик должен быть указан',
            'customer_id.in' => 'Такого пользователя не существует',
            'source_id.uuid' => 'ID источника проект должен быть uuid',
            'source_id.required' => 'Источник должен быть указан',
            'source_id.in' => 'Такого пользователя не существует',
        ];
    }
}
