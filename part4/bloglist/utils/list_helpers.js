function dummy(blogs) {
    return 1
}

function totalLikes(blogs = []) {
    let reducer = (accu, blog) => {
        return accu + blog.likes;
    }
    return blogs.reduce(reducer, 0);
}

function favoriteBlog(blogs = []) {
    let reducer = (accu, val) => {
        let { title, author, likes } = { ...val }
        let blog = {
            title,
            author,
            likes
        }
        if (!accu) {
            return blog
        } else if (accu.likes >= blog.likes) {
            return accu
        } else {
            return blog
        }
    }
    return blogs.reduce(reducer, null);
}

function mostBlogs(blogs) {
    let reducer = (accu, blog, i, arr) => {
        if (!accu[blog.author]) accu[blog.author] = 0;
        accu[blog.author]++;
        if (i === arr.length - 1) {
            let max = null;
            for (let keyAuthor in accu) {
                if (!max || accu[keyAuthor] > max.blogs) {
                    max = { author: keyAuthor, blogs: accu[keyAuthor] };
                }
            }
            accu = max;
        }

        return accu;
    };


    return blogs.length === 0 ? null : blogs.reduce(reducer, {});
};

function mostLikes(blogs) {
    let reducer = (accu, blog, i, arr) => {
        if (!accu[blog.author]) accu[blog.author] = 0;
        accu[blog.author] += blog.likes
        if (i === arr.length - 1) {
            let max = null;
            for (let keyAuthor in accu) {
                if (!max || accu[keyAuthor] > max.likes) {
                    max = { author: keyAuthor, likes: accu[keyAuthor] };
                }
            }
            accu = max;
        }

        return accu;
    };


    return blogs.length === 0 ? null : blogs.reduce(reducer, {});
};

export default { dummy, favoriteBlog, totalLikes, mostBlogs,mostLikes }