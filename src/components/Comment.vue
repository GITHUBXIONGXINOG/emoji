<template>
    <!--评论外边框-->
  <div class="comment-wrap">

    <!--评论列表,显示评论人和评论内容-->
    <div class="comments-list">
      <!--循环comments评论列表-->
      <div class="comments-list-item" v-for="(item,index) in comments" v-bind:key="index">
          <div class="comments-list-item-heading">
              <!--评论头像-->
              <img src="@/assets/img/heading.jpg" />
              <!--评论名字-->
              <span class="comments-list-item-username">不严苟笑的评论员</span>
          </div>
          <!--v-html 循环将评论列表的item字符串解析为标签属性输出-->
          <div class="comments-list-item-content" v-html="item"></div>
      </div>
    </div>

     <!-- 文本输入框 用v-model 双向数据绑定到content上面  -->
    <textarea class="comment-input" placeholder="请输入内容" id="textpanel" v-model="content"></textarea>

    <!--操作显示 表情选择 发布评论-->
    <div class="opration">
        <!--表情选择-->
        <!--添加表情图标面报点击事件-->
        <div class="emoji-panel-btn" @click="showEmojiPanel">
          <img src="../assets/img/face_logo.png" />
        </div>

        <!--添加保存评论点击事件-->
        <div @click="saveComment" class="comment-send-btn comment-send-btn-bounce">发表评论</div>

        <!--表情面报-->
        <!--调用子组件-->
        <!--接收派发事件emojiClick的数据,传入到appendEmoji函数中,并根据isShowEmojiPanel判断表情面板是否存在-->
        <emoji-panel @emojiClick="appendEmoji" v-if="isShowEmojiPanel"></emoji-panel>
    </div>

  </div>
</template>
<script>
import EmojiPanel from "./children/EmojiPanel";
export default {
  data() {
    return {
      content: "",//文本输入框内容
      flag: false,
      isShowEmojiPanel: false,
      comments: []//评论列表
    };
  },
  components: {
    EmojiPanel
  },
  methods: {
      /*保存评论*/
    saveComment() {
      /*
         1.将评论内容content入栈
         2.replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
           content是通过v-model双向绑定的文本域,点击表情,content里面会得到类似于 :angry: 的字符串,
           通过replace进行匹配正则表达式
              . 匹配除换行符 \n 之外的任何单字符
              * 匹配前面的子表达式零次或多次
              ? 匹配前面的子表达式零次或一次
              g 全局匹配
           匹配到后调用emoji方法
      */
      this.comments.push(this.content.replace(/:.*?:/g, this.emoji)); // 替换":"符号包含的字符串,通过emoji方法生成表情<span></span>
      this.content = "";
      this.isShowEmojiPanel = false;
    },

    /*是否展示表情面报*/
    showEmojiPanel() {
      //隐藏 -> 展示 -> 隐藏
      this.isShowEmojiPanel = !this.isShowEmojiPanel;
    },

   //emoji方法,对传入该方法的word进行处理,最后返回表情
    emoji(word) {
      // 生成html
      //substring() 方法返回字符串的子字符串。
      // 通过该方法去除掉匹配的前后两个冒号 如果 :angry: 转换为 angry
      const type = word.substring(1, word.length - 1);
      //通过匹配对应的class样式,显示不同的表情
      return `<span class="emoji-item-common emoji-${type} emoji-size-small" ></span>`;
    },

    //添加表情
    //text为子组件EmojiPanel传入的表情名字
    appendEmoji(text) {
      //根据id获取文本域
      const el = document.getElementById("textpanel");
      //将得到的表情名字追加到文本域中
      this.content = el.value + ":" + text + ":";
    }
  }
};
</script>

<style lang="scss">
// 注意 这里因为v-html的原因 不能使用scoped 不然样式不能失效
/*最外层边框*/
.comment-wrap {
  width: 522px;
  left: 0;
  right: 0;
  margin: 0 auto;
  //每个表情通用的样式
  //背景图片为所有表情形成的雪碧图
  .emoji-item-common {
    background: url("../assets/img/emoji_sprite.png");
    display: inline-block;
    &:hover {
      cursor: pointer;
    }
  }
  .emoji-size-small {
    // 表情大小
    zoom: 0.3;
  }
  .emoji-size-large {
    zoom: 0.5; // emojipanel表情大小
    margin: 4px;
  }
  //评论区样式
  .comments-list {
    margin-top: 20px;
    .comments-list-item {
      margin-bottom: 20px;
      .comments-list-item-heading {
        display: inline-block;
        img {
          height: 32px;
          width: 32px;
          border-radius: 50%;
          vertical-align: middle;
        }
        .comments-list-item-username {
          margin-left: 5px;
          font-weight: bold;
        }
      }
      .comments-list-item-content {
        margin: 10px 0px;
        border-bottom: 1px solid #cccccc;
        &:last-child {
          border-bottom: 0;
        }
        span {
          vertical-align: top;
        }
      }
    }
  }
  //文本域样式
  .comment-input {
    height: 100px;
    width: 500px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    padding: 10px;
    resize: none;
    &:focus {
      outline: none;
    }
  }
  //操作样式 表情面板图标,发表评论
  .opration {
    width: 522px;
    display: flex;
    justify-content: space-between;
    position: relative;
    .emoji-panel-btn {
      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
      img {
        height: 24px;
        width: 24px;
      }
    }
    .comment-send-btn {
      width: 80px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      border: 1px solid #1da1f2;
      border-radius: 100px;
      box-sizing: border-box;
      font-weight: bold;
      font-size: 13px;
      color: #ffffff;
      background-color: #4ab3f4;
      &:hover {
        cursor: pointer;
      }
    }
    .comment-send-btn-bounce {
      position: relative;
    }
    .comment-send-btn-bounce:focus {
      outline: none;
    }
    .comment-send-btn-bounce:after {
      content: "";
      display: block;
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      border-radius: 100px;
      border: 0px solid #1da1f2;
      opacity: 0.7;
      transition: all 0.1s;
    }
    .comment-send-btn-bounce:active:after {
      //.bounce active时 伪元素:after的样式
      opacity: 1;
      top: -5px;
      left: -5px;
      right: -5px;
      bottom: -5px;
      border-radius: 100px;
      border: 2px solid #1da1f2;
      transition: all 0.2s;
    }
  }
}
// 导入精灵图样式 各种表情对应位置信息
@import "../assets/css/emoji.css";
</style>

