<?php

namespace App\Providers;

// use Illuminate\Support\Facades\Gate;
use App\Models\FinanceProject;
use App\Models\Space;
use App\Models\Subject;
use App\Policies\FinanceProjectPolicy;
use App\Policies\SpacePolicy;
use App\Policies\SubjectPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        // 'App\Models\Model' => 'App\Policies\ModelPolicy',
        Space::class => SpacePolicy::class,
        FinanceProject::class => FinanceProjectPolicy::class,
        Subject::class => SubjectPolicy::class
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        //
    }
}
