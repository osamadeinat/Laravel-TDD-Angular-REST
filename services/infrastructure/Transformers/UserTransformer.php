<?php


namespace Services\Infrastructure\Transformers;

use League\Fractal;
use Services\Domain\AppUser;


class UserTransformer extends Fractal\TransformerAbstract
{
    /**
     * @param OpoUser $user
     * @return array
     */
    public function transform(AppUser $user)
    {
        return [
            'id' => $user->getId(),
            'first_name'   => $user->getFirstName(),
            'last_name'  => $user->getLastName(),
            'picture_url'  => $user->getPictureUrl(),
            'video_url' => $user->getVideoUrl(),
            'contact_info' => [
                'email' => $user->getEmail(),
                'mobile' => $user->getMobile(),
                'skype' => $user->getSkype()
            ],
            'status' => $user->getStatus(),
            'suspended' => (bool) $user->getSuspended(),
            'banned' => (bool) $user->getBanned(),
            'created_at' => $user->getCreatedAt(),
            'updated_at' => $user->getUpdatedAt()
        ];
    }
}