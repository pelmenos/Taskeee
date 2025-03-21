<?php

namespace App\Notifications;

use App\Models\InviteToken;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class InviteToSpace extends Notification implements ShouldQueue
{
    use Queueable;

    public $space;

    public $user_id;

    public $role_id;

    /**
     * Create a new notification instance.
     */
    public function __construct($space, $user_id, $role_id)
    {
        $this->space = $space;
        $this->user_id = $user_id;
        $this->role_id = $role_id;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail'];
    }

    public function viaQueues(): array
    {
        return [
            'mail' => 'mailQueue',
        ];
    }

    /**
     * Get the mail representation of the notification.
     */
    public function toMail(object $notifiable): MailMessage
    {
        $token = InviteToken::generateToken($this->space->id, $this->user_id, $this->role_id);
        $url = url('/api/invite/' . $token);

        return (new MailMessage)
                      ->subject('Приглашение в рабочее пространство')
                      ->view('invite', ['space' => $this->space, 'inviteUrl' => $url]);
    }

    /**
     * Get the array representation of the notification.
     *
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
