<?php

class Tool extends Eloquent {
	protected $fillable = ['title', 'abstract', 'authors', 'pageCount', 'year'];

	public function voters()
	{
		return $this->belongsToMany('User', 'votes');
	}
	public function upvoters()
	{
		return $this->voters()->where('is_positive', true)->orderBy('created_at', 'desc');
	}
	public function downvoters()
	{
		return $this->voters()->where('is_positive', false)->orderBy('created_at', 'desc');
	}
}
