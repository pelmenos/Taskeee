<?php

declare(strict_types=1);

namespace App\Http\Requests\API\V1\Space;

use App\DTOs\API\V1\Space\SpaceCreateDto;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Str;

final class SpaceCreateRequest extends FormRequest
{
    /**
     * @return bool
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * @return array
     */
    public function rules(): array
    {
        return [
            'owner_id' => ['required', 'uuid'],
            'name' => ['required', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:500'],
            'tariff' => ['required', 'string'],
        ];
    }

    /**
     * @return array
     */
    public function bodyParameters(): array
    {
        return [
            'owner_id' => [
                'description' => 'ID-владельца',
                'example' => Str::uuid(),
            ],
            'name' => [
                'description' => 'Название пространства',
                'example' => 'Название',
            ],
            'description' => [
                'description' => 'Описание пространства',
                'example' => 'Описание пространства',
            ],
            'tariff' => [
                'description' => 'Тариф',
                'example' => 'Хз что тут должно быть',
            ],
        ];
    }

    /**
     * @return SpaceCreateDto
     */
    public function toDto(): SpaceCreateDto
    {
        return new SpaceCreateDto(...$this->validated());
    }
}
