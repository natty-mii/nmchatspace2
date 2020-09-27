require "rails_helper"

describe MessagesController do
  let(:group) { create(:group)}
  let(:user) { create(:user)}

  describe "#index" do

    context "log in" do
      before do
        login user
        get :index, params: { group_id: group.id }
      end
    # ログインしている場合のテスト記述
    #アクション内で定義しているインスタンス変数があるかどうか
      it "assings @message" do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it "assigns @group" do
        expect(assigns(:group)).to eq group
      end

      #該当するビューが描画されているかどうか
      it "render index" do
        expect(response).to render_template :index
      end
    end

    context "not log in" do
      before do
        get :index, params: { group_id: group.id }
      end
    # ログインしていない場合のテスト記述
      it "redirects to new_user_session_path" do
        expect(response).to redirect_to (new_user_session_path)
      end
    end
  end

  describe "#create" do
    let(:params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message)} }

    context "log in" do
      #この中にログインしているとき
      before do
        login user
      end

        context "can save" do
          #この中にメッセージ保存に成功した場合
          subject { post :create, params: params}

          it "count up message" do
            expect{ subject }.to change(Message, :count).by(1)
          end

          #その後に画面遷移しているか
          it "redirects to group_messages_path" do
            subject
            expect(response).to redirect_to(group_messages_path(group))
          end
        end

        context "can not save" do
          #この中にメッセージの保存に失敗した場合
          let(:invalid_params) { { group_id: group.id, user_id: user.id, message: attributes_for(:message, content: nil, image: nil)}}

            subject {post :create, params: invalid_params}

          it "does not count up" do
            expect{ subject }.not_to change(Message, :count)
          end

           #その後意図した画面に遷移しているかどうか
          it "renders index" do
            subject
            expect(response).to render_template :index
          end
        end
    end

    context "not log in" do
      #この中にログインしていない場合
      before do
        get :create, params: params
      end

        it "redirects to new_user_session_path" do
          post :create, params: params
          expect(response).to redirect_to (new_user_session_path)
        end
    end
  end
end
