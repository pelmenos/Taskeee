<?php

namespace App\Notifications;

use App\Models\InviteToken;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use Illuminate\Support\Facades\Auth;

class InviteToSpace extends Notification implements ShouldQueue
{
    use Queueable;

    public $user_id;

    public $space;

    /**
     * Create a new notification instance.
     */
    public function __construct($space, $user_id)
    {
        $this->user_id = $user_id;
        $this->space = $space;
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
        $token = InviteToken::generateToken($this->space->id, $this->user_id);
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
