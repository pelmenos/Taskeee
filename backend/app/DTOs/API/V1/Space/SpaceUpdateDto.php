<?php

declare(strict_types=1);

namespace App\DTOs\API\V1\Space;

use App\Traits\ForDTOs\UseAsArrayTrait;

final readonly class SpaceUpdateDto
{
    use UseAsArrayTrait;

    /**
     * @param string|null $name
     * @param string|null $description
     * @param string|null $tariff
     */
    public function __construct(
        public string|null $name = null,
        public string|null $description = null,
        public string|null $tariff = null,
    )
    {
    }
}
