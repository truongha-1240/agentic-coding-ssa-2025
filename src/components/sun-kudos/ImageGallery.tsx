import Image from "next/image";
import { PlayIcon } from "@/components/icons/PlayIcon";
import type { KudoMedia } from "@/types/kudos";

interface ImageGalleryProps {
	images: KudoMedia[];
}

export function ImageGallery({ images }: ImageGalleryProps) {
	if (images.length === 0) return null;

	const visibleImages = images.slice(0, 5);

	return (
		<div className="flex flex-row gap-2">
			{visibleImages.map((media) => (
				<a
					key={media.id}
					href={media.url}
					target="_blank"
					rel="noopener noreferrer"
					className="relative w-16 h-16 flex-shrink-0"
				>
					<Image
						src={media.thumbnailUrl ?? media.url}
						alt=""
						width={64}
						height={64}
						className="aspect-square rounded-lg object-cover w-16 h-16"
					/>
					{media.type === "video" && (
						<div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/30">
							<PlayIcon className="w-8 h-8 text-white" />
						</div>
					)}
				</a>
			))}
		</div>
	);
}
