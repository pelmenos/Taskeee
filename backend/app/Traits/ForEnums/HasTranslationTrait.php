<?php

declare(strict_types=1);

namespace App\Traits\ForEnums;

use Illuminate\Support\Str;
use ReflectionClass;

trait HasTranslationTrait
{
    /**
     * @return string
     */
    public function translate(): string
    {
        $className = Str::kebab((new ReflectionClass($this))->getShortName());

        return __("enums.$className.$this->value");
    }
}
