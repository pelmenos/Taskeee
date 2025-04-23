<?php

declare(strict_types=1);

namespace App\QueryBuilders\API\V1;

use App\Models\Space;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;

/**
 * @mixin Space
 */
final class SpaceQueryBuilder extends Builder
{
    /**
     * @param string $search
     * @return self
     */
    public function search(string $search): self
    {
        $words = explode('', $search);

        return $this->where(function(self $builder) use ($words) {
            foreach ($words as $word) {
                $builder->where('name', 'LIKE', "%$word%");
            }
        });
    }

    /**
     * @param User|string $user
     * @return self
     */
    public function byOwner(User|string $user): self
    {
        return $this->where('owner_id', is_string($user) ? $user : $user->id);
    }
}
