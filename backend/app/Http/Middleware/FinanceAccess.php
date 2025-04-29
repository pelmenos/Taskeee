<?php

namespace App\Http\Middleware;

use App\Models\Space;
use App\Models\SpaceRole;
use App\Models\SpaceUser;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FinanceAccess
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $spaceUser = SpaceUser::where('email', auth()->user()->email)->firstOrFail();
        $spaceRole = SpaceRole::where('id', $spaceUser->role_id)->firstOrFail();
        if ($spaceRole->permissions['finance_access'] == 'true' ||
            $spaceRole->permissions['full_access'] == 'true') {
            return $next($request);
        }
        return response()->json([
            'message' => 'Недостаточно прав'
        ], Response::HTTP_FORBIDDEN);
    }
}
