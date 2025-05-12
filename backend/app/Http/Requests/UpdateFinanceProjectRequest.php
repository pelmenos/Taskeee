<?php

namespace App\Http\Requests;

use App\Models\FinanceProjectStatus;
use App\Models\Space;
use App\Models\SpaceUser;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class UpdateFinanceProjectRequest extends FormRequest
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
            'price' => 'regex:/^-?\d+(\.\d{1,2})?$/',
            'comment' => 'string|max:2500',
            'status_id' => 'integer|in:'
                . implode(',', FinanceProjectStatus::pluck('id')->toArray()),
            'project_id' => 'uuid|in:'
                . implode(',', $space->projects()->pluck('project_id')->toArray()),
            'coordinator_id' => 'uuid|in:'
                . implode(',', $space->users()->pluck('id')->toArray()),
            'lead_id' => 'uuid|in:'
                . implode(',', $space->users()->pluck('id')->toArray()),
            'customer_id' => 'uuid|in:'
                . implode(',', $space->users()->pluck('id')->toArray()),
            'source_id' => 'uuid|in:'
                . implode(',', $space->users()->pluck('id')->toArray()),
        ];
    }

    public function messages()
    {
        return [
            'price.regex' => 'Цена должна быть с двумя знаками после запятой и иметь длинну не более 14 цифр',
            'comment.string' => 'Комментарий должен быть строкового типа',
            'comment.max' => 'Максимальное количество символов 2500',
            'status_id.integer' => 'Статус id должен быть целочисленного типа',
            'status_id.in' => 'Такого статуса не существует',
            'project_id.uuid' => 'ID проекта должен быть uuid',
            'project_id.in' => 'Такого проекта не существует',
            'coordinator_id.uuid' => 'ID постановщика должен быть uuid',
            'coordinator_id.in' => 'Такого пользователя не существует',
            'lead_id.uuid' => 'ID ответственного за проект должен быть uuid',
            'lead_id.in' => 'Такого пользователя не существует',
            'customer_id.uuid' => 'ID закасчика за проект должен быть uuid',
            'customer_id.in' => 'Такого пользователя не существует',
            'source_id.uuid' => 'ID источника проект должен быть uuid',
            'source_id.in' => 'Такого пользователя не существует',
        ];
    }
}
