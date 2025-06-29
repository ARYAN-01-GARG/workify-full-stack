import { Calendar, CalendarClock, Wallet } from "lucide-react";
import { Button } from "../ui/button";

import PostHeader from "./PostHeader";
import { Link } from "react-router-dom";

function daysAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return 'today';
  if (diffDays === 1) return '1 day ago';
  return `${diffDays} days ago`;
}

function getApplyBy(dateString: string) {
  const date = new Date(dateString);
  date.setMonth(date.getMonth() + 1);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function PostCard({ post }: { post: Post }) {
  const skills = post.skills;

  const formatOffer = (min: number, max: number) => {
    const format = (val: number) =>
      val >= 1000 ? (val / 1000).toFixed(1).replace(/\.0$/, '') + 'K' : val.toString();
    return format(min) + ' - ' + format(max) + ' USD';
  };

  const JobDescriptions = [
    {
      icon: Wallet,
      description: 'Job Offer',
      value: formatOffer(post.offerMin, post.offerMax),
    },
    {
      icon: CalendarClock,
      description: 'Duration',
      value:
        post.duration < 12
          ? post.duration.toString() + ' months'
          : `${Math.floor(post.duration / 12)} ${Math.floor(post.duration / 12) === 1 ? 'year ' : 'years '}${post.duration % 12 === 0 ? '' : ' ' + (post.duration % 12).toString() + ' months'}`,
    },
    {
      description: 'Experience',
      value: post.experience === 0 ? 'Fresher' : post.experience.toString() + ' - years',
    },
    {
      icon: Calendar,
      description: 'Start Date',
      value: post.startDate,
    },
  ];

  return (
    <div className="bg-white rounded-xl w-full border border-[#B0B0B0] px-8 py-12 relative mt-5">
      <div className="absolute -top-5 right-5 bg-[#C8D8EF] text-primary text-lg p-2 px-4 border border-[#C8D8EF] rounded-lg">
        {post.remote ? 'Remote' : 'In-Office'}
      </div>
      <PostHeader image={post.image} title={post.title} company={post.company} location={post.location} />
      {/* Skills Section */}
      <div className="flex gap-x-5 gap-y-3 items-center mt-8 mb-4">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-background-primary text-[#16233B] text-xl font-[500] p-1 px-3 rounded-md border border-[#D1D1D1]"
          >
            {skill}
          </div>
        ))}
      </div>
      {/* Description Section */}
      <div className="flex items-center justify-between w-full pr-8">
        {JobDescriptions.map((item, index) => (
          <PostCardDescription
            key={index}
            icon={item.icon}
            description={item.description}
            value={item.value}
          />
        ))}
      </div>
      {/* Button Section and Apply By section*/}
      <div className="text-xl w-full flex justify-between items-center mt-8">
        <span className="text-primary font-[500]">
          {`Apply By ${getApplyBy(post.createdAt)} . Posted ${daysAgo(post.createdAt)}`}
        </span>
        <div className="flex gap-4 text-xl">
          <Button variant={"outline"} size={"lg"} className="cursor-pointer font-semibold">
            <Link to={`/job/${post.id}`}>View Details</Link>
          </Button>
          <Button size={"lg"} className="cursor-pointer font-semibold">
            Apply Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PostCard;

export const PostCardDescription = ({
  icon: Icon,
  description,
  value,
}: {
  icon?: React.ElementType;
  description: string;
  value: string;
}) => {
  return (
    <div className="m-6 p-2 max-w-[180px] flex flex-col items-center gap-y-3">
      <span className="flex gap-x-1 items-center text-[#5D5D5D] font-[500] text-xl">
        {Icon && <Icon className="h-6 w-6" />}
        <span>{description}</span>
      </span>
      <span className="text-[#3D3D3D] font-[500] text-xl">
        <span>{value}</span>
      </span>
    </div>
  );
};