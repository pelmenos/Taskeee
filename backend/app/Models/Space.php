<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Space extends Model
{
    use HasFactory, HasUuids;

    public $incrementing = false;

    public $keyType = 'string';

    protected $fillable = [
        'name',
        'description',
        'avatar',
        'admin_id',
        'tariff'
    ];

    public function financesProjects()
    {
        return $this->hasMany(FinanceProject::class);
    }

    public function subjects()
    {
        return $this->hasMany(Subject::class);
    }

    public function conditions()
    {
        return $this->hasMany(Condition::class);
    }
}
