<?php


namespace Services\Domain;


use Doctrine\Instantiator\Exception\InvalidArgumentException;

class AppUser
{
    private $banned;
    private $id;
    private $firstName;
    private $lastName;
    private $pictureUrl;
    private $email;
    private $createdAt;
    private $videoUrl;
    private $updatedAt;
    private $status;
    private $suspended;
    private $skype;
    private $mobile;

    public function __construct(
        $id,
        $firstName,
        $lastName,
        $email,
        $skype,
        $status,
        $mobile,
        $pictureUrl,
        $videoUrl,
        $banned,
        $suspended,
        $createdAt,
        $updatedAt
        ){

        if(is_null($id))
            throw new InvalidArgumentException;
        if(is_null($firstName))
            throw new InvalidArgumentException;
        if(is_null($lastName))
            throw new InvalidArgumentException;
        if(is_null($email))
            throw new InvalidArgumentException;
        if(is_null($skype))
            throw new InvalidArgumentException;
        if(is_null($status))
            throw new InvalidArgumentException;
        if(is_null($pictureUrl))
            throw new InvalidArgumentException;
        if(is_null($videoUrl))
            throw new InvalidArgumentException;
        if(is_null($banned))
            throw new InvalidArgumentException;
        if(is_null($suspended))
            throw new InvalidArgumentException;
        if(is_null($updatedAt))
            throw new InvalidArgumentException;
        if(is_null($createdAt))
            throw new InvalidArgumentException;


        $this->id = $id;
        $this->firstName = $firstName;
        $this->lastName = $lastName;
        $this->email = $email;
        $this->skype = $skype;
        $this->status = $status;
        $this->mobile = $mobile;
        $this->pictureUrl= $pictureUrl;
        $this->videoUrl = $videoUrl;
        $this->banned = $banned;
        $this->suspended = $suspended;
        $this->createdAt = $createdAt;
        $this->updatedAt = $updatedAt;
    }

    /**
     * @return string
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return string
     */
    public function getFirstName()
    {
        return $this->firstName;
    }

    /**
     * @return string
     */
    public function getLastName()
    {
        return $this->lastName;
    }

    /**
     * @return string
     */
    public function getPictureUrl()
    {
        return $this->pictureUrl;
    }

    /**
     * @return string
     */
    public function getVideoUrl()
    {
        return $this->videoUrl;
    }

    /**
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * @return string
     */
    public function getMobile()
    {
        return $this->mobile;
    }

    /**
     * @return string
     */
    public function getSkype()
    {
        return $this->skype;
    }

    /**
     * @return string
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * @return string
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * @return string
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * @return boolean
     */
    public function getSuspended()
    {
        return $this->suspended;
    }

    /**
     * @return boolean
     */
    public function getBanned()
    {
        return $this->banned;
    }

    public function suspend(){
        $this->suspended = true;
    }

    public function unsuspend(){
        $this->suspended = false;
    }

    public function ban(){
        $this->banned = true;
    }

    public function unban(){
        $this->banned = false;
    }
}