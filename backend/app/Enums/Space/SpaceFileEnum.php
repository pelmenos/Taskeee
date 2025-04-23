<?php

declare(strict_types=1);

namespace App\Enums\Space;

use App\Traits\ForEnums\HasTranslationTrait;

enum SpaceFileEnum: string
{
    use HasTranslationTrait;

    case AVATAR = 'avatar';
}
