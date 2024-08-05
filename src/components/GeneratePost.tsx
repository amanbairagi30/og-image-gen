import { CopyPlus, Loader, StickyNote } from "lucide-react";
import { Button } from "./ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import medial from "../../public/medial.webp"
import { ChangeEvent, useState } from "react";
import Card from "./Card";
import { Helmet } from 'react-helmet';
import { PostType } from "@/types";

export default function GeneratePost() {

    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [open, setOpen] = useState<boolean>(false);
    const [postData, setPostData] = useState<PostType[]>([]);


    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };
    const handleSubmit = async () => {
        const formData = new FormData();

        if(!title || !content) {
            alert('Title and Content are required')
            return;
        }

        formData.append("title", title);
        formData.append("content", content);
        if (file) {
            formData.append("image", file);
        }

        try {
            setLoading(true);
            const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/generate-og-image`, {
                method: "POST",
                body: formData,
            });

            setLoading(false);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                // setOgImageUrl(data.imageUrl);
                setPostData((prev: any) => [...prev, {
                    title: title,
                    content: content,
                    orgImageUrl: data?.originalImageUrl,
                    ogImage: data?.imageUrl
                }
                ])
                setOpen(false);

            } else {
                console.error("Failed to generate OG image");
                alert('error generating og image')
            }
            setTitle('');
            setContent('');
            setFile(null);
        } catch (error) {
            setLoading(false);
            console.error("Error:", error);
        }
    };

    console.log(postData)
    return (
        <div className=" h-screen ">
            <Helmet>
                <title>Post Page | Medial</title>
                <meta name="description" content="Post Page" />
                <meta property="og:image" content={postData[0]?.ogImage} />
            </Helmet>
            <div className="max-w-[1280px] h-full m-auto p-4">
                <div className="flex flex-col h-[100%] p-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <img className="w-[3rem] h-[3rem] object-cover" src={medial} alt="" />
                            <p className="text-lg font-semibold">Post Page</p>
                        </div>

                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogTrigger>
                                <Button className="flex items-center gap-2">Add Post <CopyPlus size={18} /></Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle className="my-4">Add Post</DialogTitle>
                                    <DialogDescription className=" flex flex-col gap-4">
                                        <div className="flex flex-col gap-2">
                                            {/* <Label className="font-semibold">Title</Label> */}
                                            <Input
                                                placeholder="Title"
                                                className="text-black "
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2 ">
                                            {/* <Label className="font-semibold">Content</Label> */}
                                            <Textarea
                                                placeholder="Content"
                                                className="text-black "
                                                onChange={(e) => setContent(e.target.value)}
                                            />
                                        </div>
                                        <Label className="font-semibold text-black">Image (optional)</Label>

                                        <Input
                                            type="file"
                                            placeholder="Content"
                                            className="text-black"
                                            onChange={handleFileChange}
                                        />
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <Button className="flex items-center gap-2" disabled={loading} onClick={handleSubmit}>
                                        <Loader className={`${loading ? 'block animate-spin' : 'hidden'}`} />
                                        <p>{!loading ? 'Submit' : 'Submitting'}</p>
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                    </div>


                    <div className="flex-1 py-[2rem] font-semibold flex gap-2 flex-col items-center justify-center">
                        {postData.length > 0 ? (
                            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {
                                    postData.map((item: PostType, index: number) => {
                                        return (
                                            <Card
                                                key={index}
                                                postData={item}
                                            />
                                        )
                                    })
                                }
                            </div>
                        ) : (
                            <>
                                <StickyNote size={50} />
                                <p className="text-sm">No post created yet</p>
                                {/* <Card /> */}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
