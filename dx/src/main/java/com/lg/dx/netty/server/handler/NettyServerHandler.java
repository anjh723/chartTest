package com.lg.dx.netty.server.handler;

import java.nio.charset.Charset;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.lg.dx.netty.service.NettyService;

import io.netty.buffer.ByteBuf;
import io.netty.channel.ChannelHandler;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.ChannelInboundHandlerAdapter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@ChannelHandler.Sharable
@RequiredArgsConstructor
public class NettyServerHandler extends ChannelInboundHandlerAdapter {
    private int DATA_LENGTH = 2048;
    private ByteBuf buff;

    @Value("${server.netty.msg.separator}")
    private String msgSeparator;

    @Value("${server.netty.msg.kv.separator}")
    private String kvSeparator;
    

    private final DXMsgParser dxMsgParser;

    @Autowired
    protected NettyService nettyService;

    // 핸들러가 생성될 때 호출되는 메소드
    @Override
    public void handlerAdded(ChannelHandlerContext ctx) {
        buff = ctx.alloc().buffer(DATA_LENGTH);
    }

    // 핸들러가 제거될 때 호출되는 메소드
    @Override
    public void handlerRemoved(ChannelHandlerContext ctx) {
        buff = null;
    }

    // 클라이언트와 연결되어 트래픽을 생성할 준비가 되었을 때 호출되는 메소드
    @Override
    public void channelActive(ChannelHandlerContext ctx) {
        String remoteAddress = ctx.channel().remoteAddress().toString();
        log.info("Remote Address: " + remoteAddress);
    }


    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg){
        ByteBuf mBuf = (ByteBuf) msg;
        
        String readMessage = mBuf.toString(Charset.forName("UTF8"));
        System.out.println("message from received: " + readMessage);

        // save redis after msg parse
        try {
            boolean isSaved = nettyService.saveNettyMsgToRedis(
                    dxMsgParser.parseToMap(readMessage, msgSeparator, kvSeparator));
                
            if (!isSaved) {
                throw new Exception("this message is not saved in redis\r\n"
                    +"unsaved msg content : " + readMessage);
            }
        } catch (Exception e) {
            e.printStackTrace();
            log.error(e.toString());
        }

        buff.writeBytes(mBuf);  // 클라이언트에서 보내는 데이터가 축적됨
        mBuf.release(); // ByteBuf clearing

        // 연결 유지
        ctx.write(buff);    // handlerContext에 메세지 전달

        // 연결 해제 원할시 아래 코드 주석해제
        /* final ChannelFuture f = ctx.writeAndFlush(buff);
        f.addListener(ChannelFutureListener.CLOSE); */
    }

    @Override
    public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
        // Close the connection when an exception is raised.
        ctx.close();
        cause.printStackTrace();
    }

}