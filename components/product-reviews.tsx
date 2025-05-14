"use client"

import { useState } from "react"
import { Star, ThumbsUp, ThumbsDown, Flag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"

interface ProductReviewsProps {
  productId: string
}

export function ProductReviews({ productId }: ProductReviewsProps) {
  const { toast } = useToast()
  const [userRating, setUserRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewText, setReviewText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Mock reviews data - in a real app, this would come from an API
  const reviews = [
    {
      id: "1",
      user: {
        name: "Sarah Johnson",
        avatar: "/placeholder.svg?height=40&width=40&text=SJ",
      },
      rating: 5,
      date: "2023-03-10",
      text: "Absolutely amazing game! The open world is breathtaking and the combat system is challenging but rewarding. I've spent over 100 hours playing and still discovering new things.",
      helpful: 42,
      unhelpful: 3,
    },
    {
      id: "2",
      user: {
        name: "Michael Chen",
        avatar: "/placeholder.svg?height=40&width=40&text=MC",
      },
      rating: 4,
      date: "2023-02-28",
      text: "Great game with stunning visuals and immersive gameplay. The only reason I'm not giving it 5 stars is because of some performance issues on my system. Otherwise, it's a masterpiece.",
      helpful: 18,
      unhelpful: 2,
    },
    {
      id: "3",
      user: {
        name: "Emily Rodriguez",
        avatar: "/placeholder.svg?height=40&width=40&text=ER",
      },
      rating: 5,
      date: "2023-02-15",
      text: "One of the best games I've ever played. The story is captivating, the world is vast and detailed, and the combat is challenging in all the right ways. Highly recommended!",
      helpful: 31,
      unhelpful: 1,
    },
  ]

  const handleRatingClick = (rating: number) => {
    setUserRating(rating)
  }

  const handleRatingHover = (rating: number) => {
    setHoverRating(rating)
  }

  const handleRatingLeave = () => {
    setHoverRating(0)
  }

  const handleSubmitReview = () => {
    if (userRating === 0) {
      toast({
        title: "Rating required",
        description: "Please select a rating before submitting your review.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Review submitted",
        description: "Thank you for your review! It will be published after moderation.",
      })
      setUserRating(0)
      setReviewText("")
      setIsSubmitting(false)
    }, 1000)
  }

  const handleHelpfulClick = (reviewId: string, isHelpful: boolean) => {
    toast({
      title: "Feedback recorded",
      description: `You marked this review as ${isHelpful ? "helpful" : "unhelpful"}.`,
    })
  }

  const handleReportClick = (reviewId: string) => {
    toast({
      title: "Review reported",
      description: "Thank you for your feedback. We'll review this content.",
    })
  }

  // Calculate average rating
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length

  // Calculate rating distribution
  const ratingDistribution = Array(5).fill(0)
  reviews.forEach((review) => {
    ratingDistribution[5 - review.rating]++
  })

  // Calculate percentage for each rating
  const ratingPercentages = ratingDistribution.map((count) => (count / reviews.length) * 100)

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="text-5xl font-bold mb-2">{averageRating.toFixed(1)}</div>
          <div className="flex mb-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.round(averageRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-muted-foreground">Based on {reviews.length} reviews</div>
        </div>

        <div className="space-y-2">
          {ratingPercentages.map((percentage, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="flex items-center w-20">
                <span className="text-sm">{5 - index} stars</span>
              </div>
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-yellow-400" style={{ width: `${percentage}%` }} />
              </div>
              <div className="w-10 text-right text-sm text-muted-foreground">{Math.round(percentage)}%</div>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Write a Review */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
        <div className="space-y-4">
          <div>
            <div className="text-sm font-medium mb-2">Your Rating</div>
            <div className="flex" onMouseLeave={handleRatingLeave}>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-6 w-6 cursor-pointer ${
                    i < (hoverRating || userRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                  onClick={() => handleRatingClick(i + 1)}
                  onMouseEnter={() => handleRatingHover(i + 1)}
                />
              ))}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium mb-2">Your Review</div>
            <Textarea
              placeholder="Share your experience with this product..."
              className="min-h-[120px]"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
          </div>
          <Button onClick={handleSubmitReview} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </div>
      </div>

      <Separator />

      {/* Reviews List */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
        <div className="space-y-6">
          {reviews.map((review) => (
            <div key={review.id} className="space-y-4">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={review.user.avatar} alt={review.user.name} />
                  <AvatarFallback>
                    {review.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{review.user.name}</span>
                    <span className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex my-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <p className="text-sm mt-2">{review.text}</p>
                  <div className="flex items-center gap-4 mt-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => handleHelpfulClick(review.id, true)}
                    >
                      <ThumbsUp className="mr-1 h-3 w-3" />
                      Helpful ({review.helpful})
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => handleHelpfulClick(review.id, false)}
                    >
                      <ThumbsDown className="mr-1 h-3 w-3" />
                      Unhelpful ({review.unhelpful})
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => handleReportClick(review.id)}
                    >
                      <Flag className="mr-1 h-3 w-3" />
                      Report
                    </Button>
                  </div>
                </div>
              </div>
              {reviews.indexOf(review) < reviews.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
