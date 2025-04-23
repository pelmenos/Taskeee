<?php

declare(strict_types=1);

namespace App\DTOs\API\V1\Space;

use App\Traits\ForDTOs\UseAsArrayTrait;

final readonly class SpaceCreateDto
{
    use UseAsArrayTrait;

    /**
     * @param string $owner_id
     * @param string $name
     * @param string|null $description
     * @param string $tariff
     */
    public function __construct(
        public string      $owner_id,
        public string      $name,
        public string|null $description = null,
        public string      $tariff,
    )
    {
    }
}
