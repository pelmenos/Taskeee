<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class InviteToken extends Model
{
    use HasFactory;

    protected $fillable = [
        'token',
        'expires_at',
        'space_id',
        'sender_id',
        'role_id'
    ];

    public static function generateToken($space_id, $user_id, $role_id)
    {
        $tokenData = [
            'token' => Str::random(32),
            'expires_at' => now()->addHours(24),
            'space_id' => $space_id,
            'sender_id' => $user_id,
            'role_id' => $role_id
        ];

        $tokenModel = self::create($tokenData);

        return $tokenModel->token;
    }
}
