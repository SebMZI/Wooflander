import React from "react";
import Layout from "../Layout";

const Index = () => {
  return (
    <Layout>
      <main className="tcu">
        <section className="tcu-container">
          <div className="container">
            <div className="content">
              <div className="content-header">
                <h2>Terms and Conditions of Use for Wooflander</h2>
                <p>Effective Date: November 13th, 2023</p>
                <br />
                <p>
                  Welcome to Wooflander! By using our platform, you agree to the
                  following terms and conditions.
                </p>
              </div>

              <div className="item">
                <h3>1. Collection and Use of Personal Data</h3>
                <p>
                  Wooflander collects personal information such as name,
                  address, phone number, and email address during registration.
                  This data is securely stored in a MongoDB database. Wooflander
                  uses this information to provide its services, personalize the
                  user experience, and facilitate connections between sitters
                  and dog owners.
                </p>
              </div>

              <div className="item">
                <h3>2. Privacy and Security</h3>
                <p>
                  Wooflander is committed to protecting the confidentiality of
                  users. Personal data is stored securely and is not shared with
                  third parties without the explicit consent of the user, except
                  as required by law. Cookies and similar technologies may be
                  used occasionally to improve the user experience and analyze
                  usage trends.
                </p>
              </div>

              <div className="item">
                <h3>3. User Comments</h3>
                <p>
                  Users have the option to add comments under the profiles of
                  sitters. Comments must adhere to our content guidelines.
                  Wooflander reserves the right to remove any comments that
                  violate these guidelines.
                </p>
              </div>

              <div className="item">
                <h3>4. Account Deletion and Data</h3>
                <p>
                  Users can delete their accounts at any time, resulting in the
                  permanent deletion of associated data. Wooflander reserves the
                  right to retain certain information in accordance with
                  applicable laws, even after the account is deleted.
                </p>
              </div>

              <div className="item">
                <h3>5. Changes to Terms of Use</h3>
                <p>
                  Wooflander reserves the right to update or modify these terms
                  at any time. Users will be informed of such changes through
                  appropriate communication channels on the platform.
                </p>
              </div>

              <div className="item">
                <h3>6. Intellectual Property Rights</h3>
                <p>
                  All content on Wooflander, including design, text, graphics,
                  logos, images, and software, is the exclusive property of
                  Wooflander.
                </p>
              </div>

              <p>
                By using Wooflander, you agree to these terms and conditions. If
                you have any questions or concerns, please contact at{" "}
                <a href="mailto:mrgy.sebastien@gmail.com">
                  mrgy.sebastien@gmail.com
                </a>
              </p>
              <br />
              <br />
              <p>Thank you for being part of the Wooflander community!</p>
              <br />
              <p>The Wooflander Team</p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

export default Index;
