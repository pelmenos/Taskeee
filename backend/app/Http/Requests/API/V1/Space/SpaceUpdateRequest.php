<?php

declare(strict_types=1);

namespace App\Http\Requests\API\V1\Space;

use App\DTOs\API\V1\Space\SpaceUpdateDto;
use Illuminate\Foundation\Http\FormRequest;

final class SpaceUpdateRequest extends FormRequest
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
            'name' => ['nullable', 'string', 'max:100'],
            'description' => ['nullable', 'string', 'max:500'],
            'tariff' => ['nullable', 'string'],
        ];
    }

    /**
     * @return array
     */
    public function bodyParameters(): array
    {
        return [
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
     * @return SpaceUpdateDto
     */
    public function toDto(): SpaceUpdateDto
    {
        return new SpaceUpdateDto(...$this->validated());
    }
}
